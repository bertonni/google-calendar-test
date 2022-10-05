import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  IAuthContext,
  ICalendarContext,
  IEvent,
  IFormInputs,
} from "../@types/types";
import Alert from "../components/Alert";
import { useCalendarContext } from "../contexts/CalendarContext";
import moment from "moment";
import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import {
  daysInPortuguese,
  weeks,
  months,
  daysFull,
  days,
} from "../assets/data";
import Input from "../components/Input";

const schema = yup
  .object({
    title: yup.string().required("Title field is required"),
    description: yup.string(),
    date: yup.string().required("Date field is required"),
    start: yup
      .string()
      .required("start time cannot be empty")
      .test(
        "is-greater",
        "Start time must be before end time",
        function (value) {
          const { end } = this.parent;
          return moment(value, "HH:mm").isSameOrBefore(moment(end, "HH:mm"));
        }
      ),
    end: yup
      .string()
      .required("end time cannot be empty")
      .test(
        "is-greater",
        "Start time must be before end time",
        function (value) {
          const { start } = this.parent;
          return moment(value, "HH:mm").isSameOrAfter(moment(start, "HH:mm"));
        }
      ),
    location: yup.string(),
    recurrence: yup.string(),
  })
  .required();

const AddEvent = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const [dayOfWeek, setDayOfWeek] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [weekNumber, setWeekNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { loggedUser, accessToken } = useAuthContext() as IAuthContext;

  if (!loggedUser) return <Navigate to={"/login"} />;

  const { insertEvent, message, setMessage } = useCalendarContext() as ICalendarContext;

  useEffect(() => {
    if (message?.type === "successo") reset();
  }, [message]);

  const formatDateTime = (date: string, hour: string) => {
    return `${date}T${hour}:00`;
  };

  const handleDateChange = (value: string) => {
    if (value.length === 0) {
      setDayOfWeek("");
      setWeekNumber(null);
      setSelectedDate(null);
      return;
    }

    const newDate = new Date(value);
    const dayOfWeek = daysInPortuguese[newDate.getUTCDay()];
    const dayOfMonth = newDate.getUTCDate();
    const month = newDate.getUTCMonth();
    const day = newDate.getUTCDay();

    const weekOfMonth = Math.ceil((dayOfMonth - 1 - day) / 7);

    setWeekNumber(weeks[weekOfMonth - 1]);
    setSelectedDate(`${dayOfMonth} de ${months[month]}`);
    setDayOfWeek(dayOfWeek);
  };

  const onSubmit = (data: IFormInputs) => {
    /**
     *
     * RRULE:FREQ=WEEKLY;COUNT=5;BYDAY=TU,FR;UNTIL=20220922T150000Z
     * FREQ — The frequency with which the event should be repeated (such as DAILY or WEEKLY). Required.
     * INTERVAL — Works together with FREQ to specify how often the event should be repeated.
     *  For example, FREQ=DAILY;INTERVAL=2 means once every two days.
     * COUNT — Number of times this event should be repeated.
     *  You can use either COUNT or UNTIL to specify the end of the event recurrence. Don't use both in the same rule.
     * UNTIL — The date or date-time until which the event should be repeated (inclusive).
     * BYDAY — Days of the week on which the event should be repeated (SU, MO, TU, etc.). Other similar
     *  components include BYMONTH, BYYEARDAY, and BYHOUR.
     *
     */
    setLoading(true);

    let recurr = "";
    if (data.recurrence !== "no") {
      recurr += "RRULE:FREQ=";
      const index = daysFull.indexOf(dayOfWeek);
      switch (data.recurrence) {
        case "daily":
          recurr += "DAILY;";
          break;
        case "weekly":
          recurr += `WEEKLY;BYDAY=${days[index]};`;
          break;
        case "monthly":
          recurr += "MONTHLY;";
          break;
        case "yearly":
          recurr += "YEARLY;";
          break;
        case "every-day":
          recurr += "WEEKLY;BYDAY=MO,TU,WE,TH,FR;";
          break;
        default:
          break;
      }
    }

    const event: IEvent = {
      summary: data.title,
      description: data.description,
      start: {
        dateTime: formatDateTime(data.date, data.start),
        timeZone: "America/Recife",
      },
      end: {
        dateTime: formatDateTime(data.date, data.end),
        timeZone: "America/Recife",
      },
      creator: {
        id: loggedUser?.uid,
        email: loggedUser?.email ?? "",
        displayName: loggedUser?.displayName ?? "",
        self: false,
      },
    };

    if (data.recurrence !== "no") event["recurrence"] = [recurr];

    insertEvent(event, accessToken);
    setLoading(false);
  };

  return (
    <Layout>
      <div className="h-full flex flex-col gap-6 items-center px-40 relative">
        <h1 className="text-3xl text-gray-600 font-medium">Criar Evento</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Input
            id="summary"
            name="title"
            label="Título"
            placeholder="title"
            refs={register}
          />
          <Input
            id="description"
            name="description"
            label="Descrição"
            placeholder="description"
            refs={register}
          />
          <div className="flex items-center justify-center w-full gap-2">
            <Input
              id="date"
              name="date"
              label="Data"
              placeholder="date"
              handleChange={handleDateChange}
              type="date"
              refs={register}
              fullWidth
            />
            <Input
              id="start"
              name="start"
              label="Hora Início"
              placeholder="start"
              type="time"
              refs={register}
            />
            <Input
              id="end"
              name="end"
              label="Hora Fim"
              placeholder="end"
              type="time"
              refs={register}
            />
          </div>
          <Input
            id="location"
            name="location"
            label="Localização"
            placeholder="location"
            refs={register}
          />
          <div className="flex flex-col gap-1 py-2 group">
            <label htmlFor="recurrence" className="font-medium text-gray-600 group-focus-within:text-sky-600">
              Recorrência
            </label>
            <select
              id="recurrence"
              className="input group-focus:outline outline-sky-600"
              autoComplete="off"
              placeholder="recurrence"
              {...register("recurrence")}
            >
              <option value="no">Não se repete</option>
              <option value="daily">Todos os dias</option>
              <option value="weekly">Semanal: cada {dayOfWeek}</option>
              <option value="monthly">
                Mensal: no(a) {weekNumber} {dayOfWeek}
              </option>
              <option value="yearly">Anual em {selectedDate}</option>
              <option value="every-day">
                Todos os dias da semana (segunda a sexta-feira)
              </option>
            </select>
          </div>
          <div className="flex items-center justify-center mt-2">
            <button
              className="input px-4 bg-emerald-400 border-emerald-600 text-white w-32
                cursor-pointer hover:brightness-110"
              type="submit"
            >
              {loading ? "Loading..." : "Enviar"}
            </button>
          </div>
        </form>
        {Object.keys(errors).length > 0 && (
          <div
            className="w-full rounded border border-rose-700 bg-rose-200 flex flex-col
            justify-center py-2 px-4 gap-2"
          >
            <h1 className="text-rose-500 font-medium text-lg">Errors:</h1>
            <div className="flex flex-col gap-1 justify-center">
              <p className="text-rose-500">{errors.title?.message}</p>
              <p className="text-rose-500">{errors.description?.message}</p>
              <p className="text-rose-500">{errors.date?.message}</p>
              <p className="text-rose-500">{errors.start?.message}</p>
              <p className="text-rose-500">{errors.end?.message}</p>
              <p className="text-rose-500">{errors.recurrence?.message}</p>
            </div>
          </div>
        )}
      </div>
      <Alert
        close={() => {
          setMessage(null);
        }}
        message={message}
      />
    </Layout>
  );
};

export default AddEvent;

import { useEffect, useMemo, useState } from "react";
import AddEventModal from "./AddEventModal";
import { useCalendarContext } from "../contexts/CalendarContext";
import FullCalendarComponent from "./FullCalendarComponent";
import Alert from "./Alert";
import { useAuthContext } from "../contexts/AuthContext";

const MyCalendar = () => {
  const { eventColor, setCurrentCalendar, message, setMessage } =
    useCalendarContext();
  const { loggedUser, signin } = useAuthContext();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message]);

  const CalendarMemo = useMemo(
    () => (
      <FullCalendarComponent
        showModal={setShowModal}
        setDate={setSelectedDate}
        setTime={setSelectedTime}
      />
    ),
    []
  );

  return (
    <div className="w-full">
      <AddEventModal
        show={showModal}
        close={() => setShowModal(false)}
        date={selectedDate}
        time={selectedTime}
      />
      {message ? <Alert message={message} /> : null}
      {CalendarMemo}
      <div className="flex items-center justify-between mt-2">
        {loggedUser ? (
          <span className="text-gray-600">
            Clique em qualquer data para criar um evento
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-gray-600">
              Faça o login para fazer um agendamento
            </span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <button
            className={`rounded px-4 py-1 bg-[#EF6C00] ${
              eventColor === "#EF6C00"
                ? "brightness-100"
                : "bg-opacity-50 brightness-90"
            } text-white hover:brightness-110 font-medium`}
            onClick={() => setCurrentCalendar(0)}
          >
            LAB F01
          </button>
          <button
            className={`rounded px-4 py-1 bg-[#4285F4] ${
              eventColor === "#4285F4"
                ? "brightness-100"
                : "bg-opacity-50 brightness-90"
            } text-white hover:brightness-110 font-medium`}
            onClick={() => setCurrentCalendar(1)}
          >
            LAB F02
          </button>
          <button
            className={`rounded px-4 py-1 bg-[#3F51B5] ${
              eventColor === "#3F51B5"
                ? "brightness-100"
                : "bg-opacity-50 brightness-90"
            } text-white hover:brightness-110 font-medium`}
            onClick={() => setCurrentCalendar(2)}
          >
            LAB F03
          </button>
          <button
            className={`rounded px-4 py-1 bg-[#8E24AA] ${
              eventColor === "#8E24AA"
                ? "brightness-100"
                : "bg-opacity-50 brightness-90"
            } text-white hover:brightness-110 font-medium`}
            onClick={() => setCurrentCalendar(3)}
          >
            LAB F04
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;

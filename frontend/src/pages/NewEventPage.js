import EventForm from "../components/EventForm";
import { redirect } from "react-router-dom";
function NewEventPage() {
  return <EventForm />;
}
export default NewEventPage;

export async function action({ request, params }) {
  const data = await request.formData();

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  const response = fetch("http://localhost:8080/event", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(eventData),
  });
  if (!response.ok) {
    throw ({ message: "could not save event." }, { status: 500 });
  }
  return redirect("/events");
}

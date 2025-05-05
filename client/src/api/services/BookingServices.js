const URL = "http://localhost:3000";

export const ViewBooking = async (token, page) => {
  const response = await fetch(`${URL}/viewbooking?page=${page}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch room data");
  }

  return response.json();
};

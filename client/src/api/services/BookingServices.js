const URL = process.env.REACT_APP_API_URL;

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

export const cancelbookingServices = async (id, token) => {
  const response = await fetch(`${URL}/cancelbooking/${id}`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Cancel Booking Failed");
  }

  return response.json();
};

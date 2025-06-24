export const handleApiError = (error) => {
  if (error.response) {
    console.error('API Error:', error.response.data?.message || error.message);
    return error.response.data;
  } else if (error.request) {
    console.error('No response received:', error.message);
  } else {
    console.error('Error setting up request:', error.message);
  }
  return { message: 'Something went wrong' };
};

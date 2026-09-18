const showValidationResponse = async (response: any, toast: any, errorMessage: string) => {
  const errorData = response?.data;
  if (errorData?.data) {
    const errorKeys = Object.keys(errorData.data);
    errorKeys.forEach(key => {
      toast.error(errorData.data[key]);
    });
  } else {
    toast.error(errorData.message ?? errorMessage);
  }
};
export { showValidationResponse };

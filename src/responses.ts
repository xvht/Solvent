export const successResponse = (data: any) => {
  return {
    error: false,
    code: 200,
    data,
  };
};

export const badRequestResponse = (data: any) => {
  return {
    error: true,
    code: 400,
    data,
  };
};

export const serverErrorResponse = (data: any) => {
  return {
    error: true,
    code: 500,
    data,
  };
};

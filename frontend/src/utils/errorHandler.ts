export const handleApiError = (error: any) => {
  if (error?.offline) {
    return { success: false, offline: true, data: null };
  }
  return { success: false, offline: false, data: null, error: error?.response?.data?.message || 'Erro desconhecido' };
};

export const safeApiCall = async <T,>(apiCall: () => Promise<any>, fallbackData: T): Promise<{ data: T; offline: boolean }> => {
  try {
    const response = await apiCall();
    return { data: response.data, offline: false };
  } catch (error: any) {
    if (error?.offline) {
      return { data: fallbackData, offline: true };
    }
    throw error;
  }
};

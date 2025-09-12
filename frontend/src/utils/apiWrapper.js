const apiWrapper = (queryFn) => {
  return async (...args) => {
    try {
      const { data } = await queryFn(...args);
      return data;
    } catch (error) {
      console.error("Api request error:", error);
      throw error;
    }
  };
};

export default apiWrapper;

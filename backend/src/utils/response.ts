export const success = <T>(data: T, status: number = 200) => ({
    success: true,
    status,
    data
});

export function getParams(filter) {
    const params = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
        if (value?.length && value !== "ALL") params.append(key, value);
    });

    return params;
}
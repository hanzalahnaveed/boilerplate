import moment from "moment";

// Function to format a date string
export const formatDate = (dateString, format = "YYYY-MM-DD") => {
    return moment(dateString).isValid()
        ? moment(dateString).format(format)
        : "Invalid Date";
};
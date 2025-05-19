/**
 * Truncates a filename to a shorter, user-friendly format.
 * Example: 'attachments-123456789.png' -> 'attach...6789.png'
 *
 * @param {string} filename - The original filename to truncate.
 * @returns {string} - The truncated filename.
 */
export const truncateFileName = (filename) => {
    if (!filename) return ''; // Handle undefined or null filenames

    const maxLength = 10; // Maximum length for the visible filename
    const extensionMatch = filename?.match(/\.[a-zA-Z0-9]+$/); // Extract file extension
    const extension = extensionMatch ? extensionMatch[0] : ''; // Get the extension or an empty string

    const baseName = filename?.replace(extension, ''); // Remove the extension
    if (baseName.length <= maxLength) {
        return filename; // If filename is short enough, return as is
    }

    return `${baseName?.slice(0, 6)}...${baseName.slice(-4)}${extension}`; // Truncated filename
};

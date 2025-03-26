export const truncateAddress = (walletAddress, len = 4) => {
    return walletAddress.slice(0, len) + "..." + walletAddress.slice(-len);
  };
  
  export const timeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  
    if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hr ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day ago`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks} week ago`;
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths} month ago`;
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} year ago`;
  };
  
  export const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => console.log("Copied to clipboard!"))
      .catch((err) => console.error("Failed to copy: ", err));
  };
  

// function to convert urls users enter to embed format
export const convertToEmbedURL = (url: string): string => {
  let videoID;

  // Check for YouTube URLs
  const youtubeWatchMatch = url.match(/[?&]v=([^&]+)/);
  const youtubeEmbedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/);

  if (youtubeWatchMatch && youtubeWatchMatch[1]) {
    videoID = youtubeWatchMatch[1];
    return `https://www.youtube.com/embed/${videoID}`;
  }

  if (youtubeEmbedMatch && youtubeEmbedMatch[1]) {
    return url; 
  }

  // Check for Vimeo URLs
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  const vimeoEmbedMatch = url.match(/player\.vimeo\.com\/video\/(\d+)/); 

  if (vimeoMatch && vimeoMatch[1]) {
    videoID = vimeoMatch[1];
    return `https://player.vimeo.com/video/${videoID}`;
  }

  if (vimeoEmbedMatch && vimeoEmbedMatch[1]) {
    return url; 
  }

  return url;
};

// function to validate urls for based on platform selected
export const validateURL = (url: string, provider: string | null): boolean => {
  if (provider === "youtube") {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
  } else if (provider === "vimeo") {
    const vimeoRegex = /^(https?:\/\/)?(www\.)?vimeo\.com\/.+$/;
    return vimeoRegex.test(url);
  } else if (provider === "facebook") {
    const facebookRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/.+$/;
    return facebookRegex.test(url);
  } else if (provider === "instagram") {
    const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/.+$/;
    return instagramRegex.test(url);
  } else if (provider === "tiktok") {
    const tiktokRegex = /^(https?:\/\/)?(www\.)?(tiktok\.com\/|vm\.tiktok\.com\/).+$/;
    return tiktokRegex.test(url);
  }
  return false;
};

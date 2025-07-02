export const generateRoomId = (): string => {
  return 'room-' + Math.random().toString(36).substr(2, 12);
};

export const generateInviteLink = (roomId: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/join/${roomId}`;
};

export const parseInviteLink = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    if (pathParts[1] === 'join' && pathParts[2]) {
      return pathParts[2];
    }
    return null;
  } catch {
    return null;
  }
};
import { ErrorProps, SendMessageProps } from '../types';

export async function sendMessage({
  baseUrl,
  accessId,
  useDefaultData,
  onMutate,
  onSuccess,
  onError,
  payload,
}: SendMessageProps) {
  if (!useDefaultData) {
    try {
      if (typeof onMutate === 'function') {
        onMutate();
      }
      const url = `${baseUrl}/portfolios/${accessId}/contacts?isAnon=true`;
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-Page-Title': window.document.title,
          'X-Screen-Width': window.screen.width.toString(),
          'X-Screen-Height': window.screen.height.toString(),
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw {
          message: response.statusText,
          status: response.status,
          error: null,
        };
      }
      const result = await response.json();
      if (typeof onSuccess === 'function') {
        onSuccess(result);
      }
    } catch (error) {
      if (typeof onError === 'function') {
        onError(error as ErrorProps);
      }
    }
  }
}

export async function hasAccessToMediaKit(
  baseUrl: string,
  accessId: string,
  code: string
): Promise<boolean> {
  const response = await fetch(
    `${baseUrl}/portfolios/${accessId}/contacts/${code}?isAnon=true`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'X-Page-Title': window.document.title,
        'X-Screen-Width': window.screen.width.toString(),
        'X-Screen-Height': window.screen.height.toString(),
      },
    }
  );

  const { data } = await response.json();
  return data?.access === 'approved' && data?.accessCode === code;
}

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
        headers: {
          'Content-Type': 'application/json',
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
    `${baseUrl}/portfolios/${accessId}/contacts/${code}?isAnon=true`
  );

  const { data } = await response.json();
  return data?.access === 'approved' && data?.accessCode === code;
}

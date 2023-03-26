import { nanoid } from 'nanoid';
import { getConnection } from '../../db';
import { IAResponseContext } from '../../interfaces/botResponse';

export function getShortQuestions(context: IAResponseContext): string {
  const { messages } = getConnection()
    .get('info')
    .get('GENERAL_CONTEXT')
    .find({ code: context })
    .value();
  const allData = getConnection().get('info').get(context).value();

  return (
    `${messages} \n` +
    allData
      .map((data, index) => `${index + 1}. ${data.shortQuestion}`)
      .join(' \n')
  );
}

export function insertUnknowData(unknownData: {
  message: string,
  origin: string,
  waId: string
}): void {
  getConnection()
    .get('unknown')
    .push({
      id: nanoid(),
      message: unknownData.message,
      origin: unknownData.origin || 'twilio',
      waId: unknownData.waId,
    }).write();
}

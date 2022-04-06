import { getConnection } from '../../db';
import { IAResponseContext } from '../../interfaces/botResponse';

export function getShortQuestions(context: IAResponseContext): string {
  const { messages } = getConnection().get('info').get('GENERAL_CONTEXT').find({ code: context }).value();
  const allData = getConnection().get('info').get(context).value();

  return `${messages} \n` + allData.map((data) => data.shortQuestion).join(' \n');
}

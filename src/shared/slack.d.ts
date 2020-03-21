export interface ISlackMessage {
  type: string;
  text?: {
    type: string;
    text: string;
  };
}

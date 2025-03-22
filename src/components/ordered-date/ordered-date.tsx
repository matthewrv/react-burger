import React from "react";
import orderedDateStyles from "./ordered-date.module.css";

export type TOrderedDateProps = {
  date: string;
};

export default function OrderedDate({ date }: TOrderedDateProps) {
  return (
    <time
      className={`text text_type_main-default text_color_inactive`}
      dateTime={date}
    >
      {formatDate(date)}
    </time>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const toMidnightTimestamp = (datetime: Date) =>
    new Date(datetime.toDateString()).getTime();
  const daysAgo =
    (toMidnightTimestamp(new Date()) - toMidnightTimestamp(date)) /
    (60 * 60 * 24 * 1000);

  const daysAgoString =
    daysAgo == 0
      ? "Сегодня"
      : daysAgo == 1
      ? "Вчера"
      : `${daysAgo} ${plural(daysAgo, ["день", "дня", "дней"])} назад`;

  return `${daysAgoString}, ${date.getHours()}:${date.getMinutes()}`;
}

function plural(num: number, words: [string, string, string]): string {
  var cases = [2, 0, 1, 1, 1, 2];
  return words[
    num % 100 > 4 && num % 100 < 20 ? 2 : cases[Math.min(num % 10, 5)]
  ];
}

import React from "react";
import feedStyles from "./feed.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function FeedPage(props) {
  const item = {
    _id: "123456",
    createdAt: "2025-03-21T14:43:22.587Z",
    status: "done",
    name: "Death Star Starship Main бургер",
    ingredients: [
      "60d3463f7034a000269f45e7",
      "60d3463f7034a000269f45e9",
      "60d3463f7034a000269f45e8",
      "60d3463f7034a000269f45ea",
    ],
    price: 480,
  };

  const items = [
    item,
    { ...item, _id: "123455", status: "in_progress" },
    { ...item, _id: "123454", status: "in_progress" },
    { ...item, _id: "123453", status: "done" },
    { ...item, _id: "123452", status: "done" },
  ];

  return (
    <>
      <div className={feedStyles.content}>
        <h1
          className={`${feedStyles.header} text text_type_main-large pt-10 pb-5`}
        >
          Лента заказов
        </h1>
        <ol className={`${feedStyles.ordersFeed} pr-2`}>
          {items.map((item) => (
            <li key={item._id}>
              <article className={feedStyles.card}>
                <p className={feedStyles.cardHeader}>
                  <span className="text text_type_digits-default">
                    #{item._id}
                  </span>
                  <time
                    className={`text text_type_main-default text_color_inactive`}
                    dateTime={item.createdAt} // TODO
                  >
                    {formatDate(item.createdAt)}
                  </time>
                </p>
                <p className="text text_type_main-default">{item.name}</p>
                <div>
                  <p className="text text_type_digits-default">
                    {item.price}
                    <CurrencyIcon type="primary" />{" "}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <div className={feedStyles.dashboard}>
          <div className={feedStyles.ordersDashboard}>
            <section className={feedStyles.ordersSection}>
              <h2 className="text text_type_main-medium pb-6">Готовы:</h2>
              <ul className={feedStyles.ordersList}>
                {items.map(
                  (item) =>
                    item.status == "done" && (
                      <li
                        key={item._id}
                        className={`text text_type_digits-default ${feedStyles.readyAccent}`}
                      >
                        {item._id}
                      </li>
                    )
                )}
              </ul>
            </section>
            <section className={feedStyles.ordersSection}>
              <h2 className="text text_type_main-medium pb-6">В работе:</h2>
              <ul className={feedStyles.ordersList}>
                {items.map(
                  (item) =>
                    item.status == "in_progress" && (
                      <li
                        key={item._id}
                        className="text text_type_digits-default"
                      >
                        {item._id}
                      </li>
                    )
                )}
              </ul>
            </section>
          </div>

          <section>
            <h2 className="text text_type_main-medium">
              Выполнено за всё время:
            </h2>
            <p
              className={`text text_type_digits-large ${feedStyles.accentShadow}`}
            >
              28 756
            </p>
          </section>

          <section>
            <h2 className="text text_type_main-medium">Выполнено сегодня:</h2>
            <p
              className={`text text_type_digits-large ${feedStyles.accentShadow}`}
            >
              138
            </p>
          </section>
        </div>
      </div>
    </>
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

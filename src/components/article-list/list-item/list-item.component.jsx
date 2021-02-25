import React from "react";
import { Button } from "react-bootstrap";
import dayjs from "dayjs";

export default function ListItem({ title, category, isPublic, dateTime }) {
  isPublic = isPublic ? "True" : "False";
  dateTime = dayjs(dateTime).format("DD-MM-YYYY HH:mm");
  category = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <>
      <tbody>
        <tr>
          <td>{title}</td>
          <td>{category}</td>
          <td>{dateTime}</td>
          <td>{isPublic}</td>
        </tr>
      </tbody>
    </>
  );
}

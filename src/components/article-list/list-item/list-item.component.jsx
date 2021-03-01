import React from "react";
import dayjs from "dayjs";
import history from "../../../services/history";

export default function ListItem({ title, category, isPublic, dateTime, id }) {
  isPublic = isPublic.charAt(0).toUpperCase() + isPublic.slice(1);
  dateTime = dayjs(dateTime).format("DD-MM-YYYY HH:mm");
  category = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <>
      <tbody onClick={() => history.push("/article/" + id + "/edit")}>
        <tr>
          <td style={{ width: "65%" }}>{title}</td>
          <td style={{ width: "10%" }}>{category}</td>
          <td style={{ width: "15%" }}>{dateTime}</td>
          <td style={{ width: "10%" }}>{isPublic}</td>
        </tr>
      </tbody>
    </>
  );
}

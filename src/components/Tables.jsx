/** @format */

export const Tables = (props) => {
  return (
    <>
      <tr className="gamerow">
        <td className="gamename">{props.data.gamename}</td>
        <td>{props.data.gameauthor}</td>
        <td className="gameprice ">{props.data.gameprice}</td>
        <td>{props.data.gametags}</td>
        <td>{props.data.forkids}</td>
        <td className="gamerating ">{props.data.gamerating} Stars</td>
      </tr>
    </>
  );
};

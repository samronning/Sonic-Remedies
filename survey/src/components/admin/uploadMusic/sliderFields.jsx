import { ValidationError } from "joi";

const SliderFields = ({ setFields }) => {
  const fields = ["Improvisation"];
  const vals = ["0%", "25%", "50%", "75%", "100%"];
  return fields.map((field) => (
    <div className="field-container">
      <div key={field} className="fc-main">
        <label htmlFor={field}>{field}</label>
        <div
          style={{ display: "flex", flexDirection: "column", minWidth: "55%" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {vals.map((val) => (
              <div style={{ fontSize: "10px" }} key={val}>
                {val}
              </div>
            ))}
          </div>
          <input
            id={field}
            name={field}
            type="range"
            min="0"
            max="100"
            step="25"
            defaultValue="0"
          ></input>
        </div>
      </div>
    </div>
  ));
};

export default SliderFields;

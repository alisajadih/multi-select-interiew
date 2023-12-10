import { Done, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import clsx from "clsx";
import * as React from "react";
import { useOutsideClicker } from "../hooks/useOutsideClicker";
import classes from "./multiselect.module.scss";

export const MultiSelect = () => {
  const [totalItems, setTotalItems] = React.useState<Array<string>>([]);

  const [typedValue, setTypedValue] = React.useState("");

  const [popOverOpen, setPopoverOpen] = React.useState(false);

  const [activeItems, setActiveItems] = React.useState<Array<number>>([]);

  const multiSelectRef = React.useRef<HTMLDivElement>(null);

  useOutsideClicker(multiSelectRef, () => setPopoverOpen(false));

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !!typedValue) {
      setTotalItems((prev) => [typedValue, ...prev]);
      setTypedValue("");
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypedValue(e.currentTarget.value);
  };

  const handleInputClick = () => {
    setPopoverOpen(true);
  };

  const handleListItemClick = (index: number) => () => {
    if (isActive(index))
      setActiveItems((prev) => prev.filter((prevItem) => prevItem !== index));
    else setActiveItems((prev) => [...prev, index]);
  };

  const isActive = (index: number) =>
    activeItems.find((item) => item === index) !== undefined;

  return (
    <div ref={multiSelectRef} className={classes.root}>
      <div className={classes.inputRoot}>
        <input
          value={typedValue}
          className={classes.input}
          type="text"
          onChange={handleChangeInput}
          onClick={handleInputClick}
          onKeyUp={handleKeyUp}
        />
        {popOverOpen ? (
          <KeyboardArrowUp className={classes.icon} />
        ) : (
          <KeyboardArrowDown className={classes.icon} />
        )}
      </div>
      {totalItems.length > 0 && (
        <div
          className={clsx(classes.itemsRoot, { [classes.open]: popOverOpen })}
        >
          <ul className={classes.list}>
            {totalItems.map((item, unsafeKey) => (
              <li
                onClick={handleListItemClick(unsafeKey)}
                className={clsx(classes.listItem, {
                  [classes.active]: isActive(unsafeKey),
                })}
                key={unsafeKey}
              >
                {item}
                {isActive(unsafeKey) && <Done fontSize="small" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

import { FC } from "react";
import DatalistInput from "react-datalist-input";

interface DataListProps {
    value: string;
    setValue: (value: string) => void;
}

export const DataList:FC<DataListProps> = ({
    setValue, value
}) => {
    return (
        <DatalistInput
            style={{width: 'fit-content', display: 'flex', gap: 16, marginLeft: 12, flexDirection: 'column'}}
            placeholder="Type your lang here"
            label="Lang"
            value={value}
            setValue={setValue}
            items={[
              { id: "python", value: "python" },
              { id: "javascript", value: "javascript" },
              { id: "typescript", value: "typescript" },
              { id: "php", value: "php" },
              { id: "elixir", value: "elixir" },
              { id: "reasonml", value: "reasonml" },
            ]}
        />
    )
}
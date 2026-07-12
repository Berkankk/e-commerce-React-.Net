import { ButtonGroup,Button, Typography } from "@mui/material";
import { decrement, increment, incrementbyAmount} from "./counterSlice";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";

export default function Counter()
{
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();
    return(
        <>
        <Typography>
            {count}
        </Typography>
        <ButtonGroup>
            <Button onClick={() => dispatch(increment())}>increment</Button>
            <Button onClick={() => dispatch(decrement())}>decrement</Button>
            <Button onClick={() => dispatch(incrementbyAmount(5))}>incrementByAmount</Button>
        </ButtonGroup>
        </>
    )
}
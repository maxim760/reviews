import { memo, Fragment, FC } from "react"
import CheckIcon from '@mui/icons-material/CheckOutlined';
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import { ChangeRateFn, IRatingItem } from "../../../utils/types";
import { RatingItem } from ".";

type IProps = {
  items: IRatingItem[],
  onChange: (id: IRatingItem['id']) => ChangeRateFn,
  loading?: boolean
}

const style = {display: "flex"}

export const RatingSpecList: FC<IProps> = memo(({items, onChange, loading}) => {
  return (
    <Box sx={{display: "flex", flexDirection: "column", width: "100%", justifyContent: {xs: "center", sm: "flex-start"}}}>
        {items.map(({id, rating, specName}) => {
          return (
            <Fragment key={id}>
              <Divider sx={{ my: 1 }} />
              <RatingItem
                loading={loading}
                Icon={CheckIcon}
                onChange={onChange(id)}
                value={rating}
                text='Оцените специалиста'
                subText={specName}
              />
            </Fragment>
          )
        })}
      </Box>
  )
})
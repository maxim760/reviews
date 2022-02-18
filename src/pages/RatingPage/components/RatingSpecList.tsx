import { memo, Fragment, FC } from "react"
import CheckIcon from '@mui/icons-material/CheckOutlined';
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import { ChangeRateFn, IRatingForVisit } from "../../../utils/types";
import { RatingItem } from ".";

type IProps = {
  items: IRatingForVisit[],
  onChange: (id: IRatingForVisit['CRVID']) => ChangeRateFn,
  loading?: boolean
}

const style = {display: "flex"}

export const RatingSpecList: FC<IProps> = memo(({items, onChange, loading}) => {
  return (
    <Box sx={{display: "flex", flexDirection: "column", width: "100%", justifyContent: {xs: "center", sm: "flex-start"}}}>
      {items.map((props) => {
          const id = props.CRVID
          const specName = props.RECNAME
          const rating = props.RATING
          const img = props.IMGURL
          return (
            <Fragment key={id}>
              <Divider sx={{ my: 1 }} />
              <RatingItem
                withAvatar
                img={img}
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
import {FC, memo} from "react"
import Box, { BoxProps } from "@mui/material/Box"
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import AssignmentIcon from '@mui/icons-material/AssignmentIndOutlined';
import Skeleton from '@mui/material/Skeleton';
import { ChangeRateFn, IRating } from "../../../utils/types";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import { OverridableComponent } from "@mui/material/OverridableComponent";

const iconStyle = {fontSize: 24, color: "#9E9E9E"}

type IProps = {
  onChange: ChangeRateFn,
  value: IRating,
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
  text: string,
  subText?: string,
  loading?: boolean
} 
const wrapStyle = {display: "flex", width: "100%", justifyContent: {xs: "center", sm: "flex-start"}}
export const RatingItem: FC<IProps> = memo(({onChange, value, Icon, text, subText, loading}) => {
  if (loading) {
    return (
      <Box sx={wrapStyle}>
        <Skeleton height="fit-content"><Icon sx={iconStyle} /></Skeleton>
        <Box sx={{flexGrow: 1, display: "flex", flexDirection: "column", ml: 2}}>
          <Skeleton width="50%">
            <Typography variant="subtitle2" lineHeight={iconStyle.fontSize + "px"} fontWeight={500}>
              .
            </Typography>
          </Skeleton>
          {!!subText && <Skeleton width="80%"><Typography variant="body1">.</Typography></Skeleton>}
          <Skeleton height="30px"><Rating size={'large'} value={value} onChange={onChange} /></Skeleton>
        </Box>
      </Box>
    )
  }
  return (
    <Box sx={wrapStyle}>
      <Icon sx={iconStyle} />
      <Box sx={{flexGrow: 1, display: "flex", flexDirection: "column", ml: 2}}>
        <Typography variant="subtitle2" lineHeight={iconStyle.fontSize + "px"} fontWeight={500}>
          {text}
        </Typography>
        {!!subText && <Typography variant="body1">{subText}</Typography>}
        <Rating size={'large'} value={value} onChange={onChange} sx={{height: '30px'}} />
      </Box>
    </Box>
  )
})
import {FC, memo} from "react"
import Box, { BoxProps } from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import AssignmentIcon from '@mui/icons-material/AssignmentIndOutlined';
import Skeleton from '@mui/material/Skeleton';
import { ChangeRateFn, IRating } from "../../../utils/types";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import { OverridableComponent } from "@mui/material/OverridableComponent";

const iconStyle = {fontSize: 24, color: "#9E9E9E"}
const avatarStyle = {width: 42, height: 42, marginTop: "4px"}

type IProps = {
  onChange: ChangeRateFn,
  value: IRating,
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
  img?: string,
  withAvatar: boolean,
  text: string,
  subText?: string,
  loading?: boolean
} 
const wrapStyle = {display: "flex", width: "100%", justifyContent: {xs: "center", sm: "flex-start"}}
export const RatingItem: FC<IProps> = memo(({ onChange, value, Icon, text, subText, loading, img, withAvatar }) => {
  console.log({img})
  if (loading) {
    return (
      <Box sx={wrapStyle}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {!!withAvatar ? <Skeleton sx={{ marginTop: "4px" }} variant="circular"><Avatar sx={{ ...avatarStyle, marginTop: 0 }} /></Skeleton> : (
            <Skeleton height="fit-content"><Icon sx={iconStyle} /></Skeleton>
          )}
          
        </Box>
        <Box sx={{flexGrow: 1, display: "flex", flexDirection: "column", ml: withAvatar ? 2 : 1.5}}>
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
      <Box sx={{display: "flex",flexDirection: "column"}}>
        {!!withAvatar ? <Avatar sx={avatarStyle} alt="Фото спец." src={img} /> : <Icon sx={iconStyle} /> }
      </Box>
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
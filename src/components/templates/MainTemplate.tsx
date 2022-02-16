import { FC } from "react"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import { useTheme } from "@mui/material"

export const MainTemplate: FC = ({ children }) => {
  return (
    <Box sx={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: {xs: 2, sm: 2}}}>
      <Paper
        sx={{
          width: "100%",
          maxWidth: {xs: "400px", sm: "400px"},
          height: { xs: "auto", sm: "auto" },
          display: "flex",
          flexDirection: "column",
          // justifyContent: {xs: "center", sm: "flex-start"},
          // alignItems: {xs: "center", sm: "flex-start"},
          maxHeight: "100%",
          overflowY: "auto",
          p: {xs: 1.5, sm: 2},
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        {children}
      </Paper>
    </Box>
      
  )
}
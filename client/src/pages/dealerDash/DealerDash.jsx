import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { DealerCustomerInfo } from "../../components/dealerCustomerInfo/DealerCustomerInfo";
import { CustomerForm } from "../../components/customerForm/CustomerForm";
import { DisplayVehicleInfo } from "../../components/displayVehicleInfo/DisplayVehicleInfo";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "linear-gradient(to right, #d3d3d3, #87ceeb)",
    },
  },
  typography: {
    fontFamily: "Roboto",
    h4: {
      fontWeight: 600,
      color: "linear-gradient(to right, #ff7e5f, #feb47b)",
      WebkitBackgroundClip: "text",
    },
  },
});

export const DealerDash = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dealerCode = location.state?.dealerCode;

  // Extract last 10 digits from dealerCode
  const lastTenDigits = dealerCode ? dealerCode.slice(-10) : "";

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      navigate("/dealerLogin");
    }
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove("authToken"); // Assuming 'authToken' is the name of the cookie
    navigate("/dealerLogin"); // Redirect to dealerlogin page
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        style={{
          background: theme.palette.background.default,
          padding: "40px",
          borderRadius: "16px",
          marginTop: "20px",
          marginBottom: "20px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          style={{ fontFamily: theme.typography.fontFamily }}
        >
          Dealer Dashboard
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          style={{ marginBottom: "20px" }}
        >
          Logout
        </Button>
        <Grid container spacing={4} style={{ display: "flex", flexWrap: "wrap" }}>
          <Grid item xs={12} md={6} style={{ display: "flex", marginBottom: "20px" }}>
            <Card
              style={{
                flexGrow: 1,
                padding: "20px",
                margin: "10px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                borderRadius: "16px",
                transition: "transform 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <CardHeader action={<></>} />
              <CardContent>
                <CustomerForm />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} style={{ display: "flex", marginBottom: "20px" }}>
            <Card
              style={{
                flexGrow: 1,
                padding: "20px",
                margin: "10px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                borderRadius: "16px",
                transition: "transform 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <CardHeader action={<></>} />
              <CardContent>
                <DealerCustomerInfo />
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ display: "flex", marginBottom: "20px" }}
          >
            <Card
              style={{
                flexGrow: 1,
                padding: "20px",
                margin: "10px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                borderRadius: "16px",
                transition: "transform 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <CardHeader action={<></>} />
              <CardContent>
                {/* Pass lastTenDigits to DisplayVehicleInfo */}
                <DisplayVehicleInfo
                  showDeleteButton={false}
                  showLabel={false}
                  lastTenDigits={lastTenDigits}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};
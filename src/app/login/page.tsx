"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Grow,
  Fade,
} from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const signIn = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Check your email for the login link!");
    }

    setLoading(false);
  };

  return (
    <Box
      className="login-card"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="linear-gradient(135deg, #ece9e6, #ffffff)"
      px={2}
    >
      <Grow in timeout={800}>
        <Card
          sx={{
            maxWidth: 400,
            width: "100%",
            borderRadius: 3,
            boxShadow: 6,
            backdropFilter: "blur(6px)",
          }}
        >
          <CardContent>
            <Fade in timeout={1000}>
              <Typography
                variant="h5"
                component="h1"
                textAlign="center"
                gutterBottom
                fontWeight="bold"
                sx={{
                  background: "linear-gradient(90deg,#007aff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Student Login
              </Typography>
            </Fade>

            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              disabled={loading}
            />

            <Button
              onClick={signIn}
              variant="contained"
              fullWidth
              size="large"
              disabled={loading || !email}
              sx={{
                mt: 2,
                borderRadius: 5,
                background: "007aff",
                py: 1.2,
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.03)",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "007aff" }} />
              ) : (
                "Send Link"
              )}
            </Button>

            <Fade in={Boolean(message)}>
              <Alert severity="success" sx={{ mt: 3 }}>
                {message}
              </Alert>
            </Fade>

            <Fade in={Boolean(error)}>
              <Alert severity="error" sx={{ mt: 3 }}>
                {error}
              </Alert>
            </Fade>
          </CardContent>
        </Card>
      </Grow>
    </Box>
  );
}

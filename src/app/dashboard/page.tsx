"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface Lesson {
  id: number;
  title: string;
  description: string;
  scheduled_at: string;
  completed?: boolean;
}

export default function Dashboard() {
  const router = useRouter();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      const studentId = session.user.id;
      const { data: lessonsData } = await supabase
        .from("lessons")
        .select("*")
        .order("scheduled_at");
      const { data: completionData } = await supabase
        .from("lesson_completion")
        .select("*")
        .eq("student_id", studentId);
      const completedLessonIds = (completionData ?? [])
        .filter((c) => c.completed)
        .map((c) => c.lesson_id);
      const enrichedLessons = (lessonsData ?? []).map((lesson) => ({
        ...lesson,
        completed: completedLessonIds.includes(lesson.id),
      }));
      setLessons(enrichedLessons);
      setLoading(false);
    };
    fetchLessons();
  }, [router]);

  const markComplete = async (lessonId: number) => {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    await supabase.from("lesson_completion").upsert(
      {
        student_id: session.user.id,
        lesson_id: lessonId,
        completed: true,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "student_id,lesson_id" }
    );
    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, completed: true } : lesson
      )
    );
    setLoading(false);
  };

  if (loading)
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bgcolor="#f5faff"
      >
        <Typography variant="h5" color="primary">
          Loading...
        </Typography>
      </Box>
    );

  return (
    <Box minHeight="100vh" py={6} sx={{ zIndex: "10", position: "relative" }}>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h1"
          fontWeight={800}
          gutterBottom
          color="primary"
          sx={{ letterSpacing: 1 }}
        >
          Upcoming Lessons
        </Typography>
        <Grid container spacing={4}>
          {lessons.map((lesson) => (
            <Grid size={{ xs: 12, sm: 6 }} key={lesson.id}>
              <Card
                elevation={6}
                sx={{
                  borderRadius: 4,
                  background: "linear-gradient(135deg,#fff 80%,#e3f0ff 100%)",
                  boxShadow:
                    "0 6px 36px -6px rgba(51,91,245,0.15), 0 2px 4px rgba(12,44,92,0.09)",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    fontWeight={700}
                    color="primary.dark"
                    mb={0.5}
                  >
                    {lesson.title}
                  </Typography>
                  <Typography variant="body1" mb={1}>
                    {lesson.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mb={1}
                    fontSize={14}
                  >
                    {new Date(lesson.scheduled_at).toLocaleString()}
                  </Typography>
                  {lesson.completed ? (
                    <Button
                      startIcon={<CheckCircleIcon />}
                      variant="contained"
                      color="success"
                      fullWidth
                      disabled
                      sx={{ borderRadius: 5 }}
                    >
                      Completed
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      fullWidth
                      color="primary"
                      size="large"
                      onClick={() => markComplete(lesson.id)}
                      sx={{
                        fontWeight: 700,
                        letterSpacing: 0.5,
                        boxShadow: "0 2px 8px 0 rgba(51, 91, 245, 0.08)",
                        borderRadius: 5,
                        background: "rgb(0, 122, 255)",
                        mt: 1,
                      }}
                    >
                      Mark Complete
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

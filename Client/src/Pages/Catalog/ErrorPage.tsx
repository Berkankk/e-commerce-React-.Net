import {
  Alert,
  AlertTitle,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import { useState } from "react";
import requests from "../../api/requests";

export default function ErrorPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  function getValidationErrors() {
    requests.Errors.getValidationError()
      .then(() => console.log("no validation"))
      .catch((errors) => setValidationErrors(errors));
  }

  return (
    <Container sx={{ mt: 4 }}>
      {validationErrors.length > 0 && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <AlertTitle>Validation Errors</AlertTitle>

          <List dense>
            {validationErrors.map((error, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText primary={error} />
              </ListItem>
            ))}
          </List>
        </Alert>
      )}

      <Stack spacing={2} sx={{ mt: 2 }}>
        <Button
          variant="contained"
          onClick={() => requests.Errors.get400Error()}
        >
          Generate 400 Error
        </Button>

        <Button
          variant="contained"
          onClick={() => requests.Errors.get401Error()}
        >
          Generate 401 Error
        </Button>

        <Button
          variant="contained"
          onClick={() => requests.Errors.get404Error()}
        >
          Generate 404 Error
        </Button>

        <Button
          variant="contained"
          onClick={() => requests.Errors.get500Error()}
        >
          Generate 500 Error
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={getValidationErrors}
        >
          Generate Validation Error
        </Button>
      </Stack>
    </Container>
  );
}
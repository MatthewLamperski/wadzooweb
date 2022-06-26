import React, { useState } from "react";
import { Button, Text } from "native-base";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

const ReachOut = ({
  source,
  title,
  subtitle,
  textAreaTitle,
  textAreaPlaceholder,
}) => {
  const [newQuestion, setNewQuestion] = useState();
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    setLoading(true);
    if (
      !newQuestion ||
      !("email" in newQuestion && newQuestion.email.length !== 0) ||
      !("question" in newQuestion && newQuestion.question.length !== 0)
    ) {
      setLoading(false);
      toast.error("Please fill in both fields.");
    } else {
      emailjs
        .send(
          "wadzoo",
          "wadzoo-message",
          {
            message: newQuestion.question,
            email: newQuestion.email,
            source: source,
          },
          "user_O8a39t79Xp7F45Kwvqx7L"
        )
        .then(() => {
          setNewQuestion(undefined);
          setLoading(false);
          toast.success(
            "Submitted! We will get back to you as soon as possible!"
          );
        })
        .catch((err) => {
          setLoading(false);
          toast.success(
            "Something went wrong, we couldn't send that. Please contact development@wadzoo for assistance."
          );
        });
    }
  };
  return (
    <div style={styles.addQuestion}>
      <Text fontSize={20}>{title}</Text>
      <Text color="muted.500" fontSize={16}>
        {subtitle}
      </Text>
      <Form.Label className="mt-4">Email address</Form.Label>
      <Form.Control
        value={newQuestion && newQuestion.email ? newQuestion.email : ""}
        type="email"
        placeholder="name@example.com"
        onChange={({ target: { value } }) =>
          setNewQuestion((prevState) => ({ ...prevState, email: value }))
        }
      />
      <Form.Label className="mt-4">
        {textAreaTitle ? textAreaTitle : "What is your question?"}
      </Form.Label>
      <Form.Control
        value={newQuestion && newQuestion.question ? newQuestion.question : ""}
        as="textarea"
        placeholder={textAreaPlaceholder ? textAreaPlaceholder : "Question"}
        onChange={({ target: { value } }) =>
          setNewQuestion((prevState) => ({
            ...prevState,
            question: value,
          }))
        }
      />
      <div style={styles.buttonContainer}>
        <Button isLoading={loading} onPress={() => handleSubmit()}>
          Submit
        </Button>
      </div>
    </div>
  );
};

const styles = {
  addQuestion: {
    paddingTop: 60,
    paddingBottom: 20,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    display: "flex",
  },
  buttonContainer: {
    display: "flex",
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
  },
};

export default ReachOut;

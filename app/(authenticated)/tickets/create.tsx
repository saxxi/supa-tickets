import { Text, View, StyleSheet, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";

import { Ticket } from "@/interfaces/ticket";
import { Theme } from "@/constants/Theme";
import Colors from "@/constants/Colors";
import TextInput from "@/components/form/TextInput";
import ImagePicker from "@/components/form/ImagePicker";
import Button from "@/components/Button";

type TicketFormValues = Partial<Ticket>;

export default function CreateTicket() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TicketFormValues>({
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const onSubmit = (data: TicketFormValues) => console.log(data);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value || ""}
            error={errors.title && "Please enter a title"}
          />
        )}
        name="title"
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value || ""}
            error={errors.description && "Please verify the description"}
          />
        )}
        name="description"
      />

      <ImagePicker label="Pick an image..." />

      <Button onPress={handleSubmit(onSubmit)} label="Create ticket" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 30,
  },
  inputForm: {
    marginBottom: 10,
  },
  label: {
    fontWeight: Theme.fontWeights.medium,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.neutral(100),
    padding: 10,
    borderRadius: Theme.radius.xs,
  },
  errorMessage: {
    color: "red",
  },
  button: {
    padding: 10,
    textAlign: "center",
    backgroundColor: "blue",
    borderRadius: Theme.radius.sm,
    color: Colors.white,
  },
});

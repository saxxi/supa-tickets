import { Text, View, StyleSheet, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";

import { Ticket } from "@/interfaces/ticket";
import { theme } from "@/settings/theme";
import InputField from "@/components/form/InputField";
import ImagePicker from "@/components/form/ImagePicker";

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
          <InputField
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
          <InputField
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

      <Pressable onPress={handleSubmit(onSubmit)}>
        <Text style={styles.button}>Create ticket</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  inputForm: {
    marginBottom: 10,
  },
  label: {
    fontWeight: theme.fontWeights.medium,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.neutral(100),
    padding: 10,
    borderRadius: theme.radius.xs,
  },
  errorMessage: {
    color: "red",
  },
  button: {
    padding: 10,
    textAlign: "center",
    backgroundColor: "blue",
    borderRadius: theme.radius.sm,
    color: theme.colors.white,
  },
});

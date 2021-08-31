import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Button, dismiss, TextField} from '../../atoms';
import {UiContext, UserContext} from '../../../contexts';
import {Status} from '../../../contexts/ui';
import {Todos} from '../../../domain/models';
import * as TodosRepository from '../../../domain/repositories/todos';
import {useControlledComponent} from '../../../lib/hooks';
import useNetworker from '../../../lib/hooks/use-networker';
import * as LocalStore from '../../../lib/local-store';
import registerUserToFirebase from '../../../lib/firebase/register-user';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    marginVertical: 20,
  },
  button: {
    marginTop: 20,
  },
});

interface Props {
  actions: {
    setTodos: (todos: Todos.Model) => void;
  };
}

export default function SignUp(props: Props) {
  const {setUserState} = React.useContext(UserContext);
  const {setApplicationState} = React.useContext(UiContext);
  const networker = useNetworker();
  const mailAddress = useControlledComponent('');
  const password = useControlledComponent('');

  const registerUser = React.useCallback(async () => {
    await networker(async () => {
      const userInformation = await registerUserToFirebase(
        mailAddress.value,
        password.value,
      );
      setUserState(userInformation);
      setApplicationState(Status.AUTHORIZED);
      await LocalStore.UserInformation.save(userInformation);
      const todos = await TodosRepository.getAll(userInformation.id);
      props.actions.setTodos(todos);
    });
  }, [
    setApplicationState,
    mailAddress.value,
    networker,
    password.value,
    props.actions,
    setUserState,
  ]);

  return (
    <TouchableWithoutFeedback onPress={dismiss}>
      <View style={styles.container}>
        <TextField
          label="email"
          value={mailAddress.value}
          onChangeText={mailAddress.onChangeText}
          style={styles.text}
          autoCompleteType="email"
        />
        <TextField
          label="password"
          value={password.value}
          onChangeText={password.onChangeText}
          style={styles.text}
          autoCompleteType="password"
          secureTextEntry={true}
        />
        <Button
          onPress={registerUser}
          style={styles.button}
          label={'Register'}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

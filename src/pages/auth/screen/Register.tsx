import React from 'react';
import {
  View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView,
} from 'react-native';
import { useRegister } from '../../../hooks/useRegister';
import { FormInput } from '../../../components/FromInput';
import { RegisterFormData } from '../schemas/SignUp';
import { SafeAreaView } from 'react-native-safe-area-context';

const Register = ({ navigation }: { navigation: any }) => {
  const { control, errors, isSubmitting, isRegistering, password, handleSubmit } =
    useRegister();

  return (

    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Sign up</Text>
        <View style={styles.formContainer}>
          <FormInput<RegisterFormData>
            control={control}
            name="name"
            placeholder="User Name"
            error={errors.name}
            inputStyle={styles.input}
          />
          <FormInput<RegisterFormData>
            control={control}
            name="email"
            placeholder="Email"
            error={errors.email}
            inputStyle={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <FormInput<RegisterFormData>
            control={control}
            name="password"
            placeholder="Password"
            secureTextEntry
            error={errors.password}
            inputStyle={styles.input}
          />

          <FormInput<RegisterFormData>
            control={control}
            name="conformPassword"
            placeholder="Confirm Password"
            secureTextEntry
            error={errors.conformPassword}
            inputStyle={styles.input}
          />
          <View style={styles.passwordRequirements}>
            <Text style={styles.requirementsTitle}>Password must contain:</Text>
            <View style={styles.requirementItem}>
              <View style={[styles.bullet, password?.length >= 8 && styles.bulletActive]} />
              <Text style={[styles.requirementText, password?.length >= 8 && styles.requirementMet]}>
                At least 8 characters
              </Text>
            </View>
            <View style={styles.requirementItem}>
              <View style={[styles.bullet, /[A-Z]/.test(password || '') && styles.bulletActive]} />
              <Text style={[styles.requirementText, /[A-Z]/.test(password || '') && styles.requirementMet]}>
                At least one uppercase letter
              </Text>
            </View>
            <View style={styles.requirementItem}>
              <View style={[styles.bullet, /[a-z]/.test(password || '') && styles.bulletActive]} />
              <Text style={[styles.requirementText, /[a-z]/.test(password || '') && styles.requirementMet]}>
                At least one lowercase letter
              </Text>
            </View>
            <View style={styles.requirementItem}>
              <View style={[styles.bullet, /[0-9]/.test(password || '') && styles.bulletActive]} />
              <Text style={[styles.requirementText, /[0-9]/.test(password || '') && styles.requirementMet]}>
                At least one number
              </Text>
            </View>
          </View>


          <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleSubmit}
            disabled={isSubmitting || isRegistering}
          >
            {isSubmitting || isRegistering ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.signUpButtonText}>Sign up</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.orText}>or</Text>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={styles.loginLink}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 24,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
  },
  passwordRequirements: {
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  requirementsTitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
    fontWeight: '500',
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ccc',
    marginRight: 8,
  },
  bulletActive: {
    backgroundColor: '#34C759',
  },
  requirementText: {
    fontSize: 12,
    color: '#999',
  },
  requirementMet: {
    color: '#34C759',
  },
  signUpButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
    marginVertical: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
  loginLink: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default Register;

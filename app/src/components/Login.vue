<template>
  <div>
    <a-row type="flex" justify="center">
      <a-col :span="10">
        <img
          style="margin: 0 auto; display: block;  width: 500px; padding: 12px 0; max-height: 286px"
          src="../assets/cover.png"
        />
        <a-card>
          <a-tabs defaultActiveKey="1">
            <a-tab-pane tab="Connexion" key="1">
              <a-form
                id="components-form-demo-normal-login"
                :form="form"
                class="login-form"
                @submit="handleLogin"
              >
                <a-form-item>
                  <a-input placeholder="Email" v-model="email">
                    <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-input type="password" placeholder="Mot de passe" v-model="password">
                    <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-checkbox>Remember me</a-checkbox>
                  <a class="login-form-forgot" href>Forgot password</a>
                  <a-button type="primary" html-type="submit" class="login-form-button">Connexion</a-button>
                </a-form-item>
              </a-form>
            </a-tab-pane>
            <a-tab-pane tab="Inscription" key="2">
              <a-form :form="form" @submit="handleSign">
                <!-- <a-form-item v-bind="formItemLayout">
                  <span slot="label">Prénom&nbsp;</span>
                  <a-input v-model="signFirstname" />
                </a-form-item> -->
                <a-form-item v-bind="formItemLayout">
                  <span slot="label">Entreprise&nbsp;</span>
                  <a-input v-model="signName" />
                </a-form-item>
                <a-form-item v-bind="formItemLayout">
                  <span slot="label">
                    Email&nbsp;
                    <a-tooltip title="Utilisé pour vous enregistrer uniquement">
                      <a-icon type="question-circle-o" />
                    </a-tooltip>
                  </span>
                  <a-input v-model="signEmail" />
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="Mot de passe">
                  <a-input v-model="signPassword" type="password" />
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="Confirmer mdp">
                  <a-input type="password" @blur="handleConfirmBlur" />
                </a-form-item>
                <a-form-item v-bind="tailFormItemLayout">
                  <a-checkbox>J'accepte les conditions d'utilisation</a-checkbox>
                </a-form-item>
                <a-form-item v-bind="tailFormItemLayout">
                  <a-button type="primary" html-type="submit">S'inscrire</a-button>
                </a-form-item>
              </a-form>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// import services from "../services";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  name: "Login",
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: "horizontal_login" }),
      confirmDirty: false,
      autoCompleteResult: [],
      email: "",
      password: "",
      // signFirstname: "",
      signName: "",
      signPassword: "",
      signEmail: "",
      signTerms: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  methods: {
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("userName") && getFieldError("userName");
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("password") && getFieldError("password");
    },
    handleLogin(e) {
      e.preventDefault();
      console.log(this.form)
      this.form.validateFields(() => {
        this.$service.account
          .login({
            email: this.email,
            password: this.password
          })
          .then(res => {
            this.$service.account.persist(res.data);
            this.$message.success("Bienvenue ");
            this.$router.push({ path: '/'})
          })
          .catch(err => {
            this.$message.error(err.message);
          });
      });
    },
    handleSign(e) {
      e.preventDefault();
      this.form.validateFields(() => {
        this.$message.loading("Inscription ...", 0.5);
        this.$service.account
          .register({
            // firstname: this.signFirstname,
            companyName: this.signName,
            email: this.signEmail,
            password: this.signPassword,
            termsAccepted: true
          })
          .then(() => {
            this.$service.account
              .login({
                email: this.signEmail,
                password: this.signPassword
              })
              .then(res => {
                this.$service.account.persist(res.data);
                this.$message.success("Bienvenue ");
               this.$router.push({ path: '/'})
              })
              .catch(err => {
                this.$message.error(err.message);
              });
          })
          .catch(err => {
            this.$message.error(err.message);
          });
      });
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>

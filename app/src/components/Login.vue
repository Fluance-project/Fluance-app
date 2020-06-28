<template>
  <div>
    <a-row type="flex" justify="center">
      <a-col :span="10">
        <img
          style="margin: 32px auto; display: block; max-width: 100%; padding: 12px 0; max-height: 100px"
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
                  <a-input type="email" placeholder="Email" v-model="email">
                    <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-input type="password" placeholder="Mot de passe" v-model="password">
                    <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-checkbox v-model="rememberMe">Remember me</a-checkbox>
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
                  <a-input type="email" v-model="signEmail" />
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="Mot de passe">
                  <a-input v-model="signPassword" type="password" />
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="Confirmer mdp">
                  <a-input type="password" @blur="handleConfirmBlur" v-model="samePassword" />
                </a-form-item>
                <a-form-item v-bind="tailFormItemLayout">
                  <a-checkbox v-model="signTerms">J'accepte les conditions d'utilisation</a-checkbox>
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
import { mapState } from 'vuex'

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
      rememberMe: true,
      // signFirstname: "",
      signName: "",
      signPassword: "",
      samePassword: "",
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
      // console.log(this.$store.state.account)
      const userData = JSON.parse(this.$service.account.getDataUser())
      if (userData) {
        this.email = userData.email;
        this.password = userData.password
      }
    });
  },
  computed: mapState({
    account: state => state.account
  }),
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
      this.form.validateFields(() => {
        this.$service.account
          .login({
            email: this.email,
            password: this.password
          })
          .then(res => {
            if (this.rememberMe === true) {
              this.$service.account.persist(res.data);
            } else {
              localStorage.removeItem('user')
            }
            this.$service.account.persist(res.data);
            this.$message.success("Bienvenue " + this.account.user);
            this.$router.push({ path: '/'})
          })
          .catch(() => {
            this.$message.error("Mauvais identifiant / mot de passe");
          });
      });
    },
    handleSign(e) {
      e.preventDefault();
      this.form.validateFields(() => {
        this.$message.loading("Inscription ...", 0.5);
        if (this.signPassword !== this.samePassword) {
          this.$message.error("Les mots de passe ne correspondent pas.")
        } else if (this.signTerms === false) {
          this.$message.info("Veuillez accepter les conditions d'utilisation")
        } else {
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
                  // stored user and token information
                  this.$store.dispatch('account/token', res.data.token);
                  this.$message.success("Bienvenue " + this.account.user);
                  this.$router.push({ path: '/'})
                })
                .catch(err => {
                  console.log(err);
                  this.$message.error(err.message);
                });
            })
            .catch(err => {
              this.$message.error(err.message);
            });
        }
      });
    },
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

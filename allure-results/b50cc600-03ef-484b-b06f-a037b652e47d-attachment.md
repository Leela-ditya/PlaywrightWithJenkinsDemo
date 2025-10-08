# Page snapshot

```yaml
- main "Login Page" [ref=e9]:
  - generic [ref=e10]:
    - generic [ref=e11]:
      - img "Company Logo" [ref=e13]
      - form "Login Form" [ref=e14]:
        - heading "Login Form" [level=1] [ref=e15]
        - generic [ref=e16]:
          - generic [ref=e17]: Username
          - textbox "Username" [active] [ref=e18]
          - generic [ref=e19]: Enter your username
        - generic [ref=e20]:
          - generic [ref=e21]: Password
          - textbox "Password" [ref=e22]
          - generic [ref=e23]: Enter your password
        - generic [ref=e24]:
          - text: By logging in to your account, you agree to our
          - button "Terms and Conditions" [ref=e25] [cursor=pointer]: terms & conditions
          - text: . You may receive SMS Notifications from us and can opt out any time.
        - generic [ref=e26]:
          - button "Login" [disabled]:
            - text: Login
            - generic: 
          - link "Forgot Password" [ref=e28] [cursor=pointer]:
            - /url: "#/auth/forgot-password"
            - generic [ref=e29]: 
            - text: Forgot Password?
        - alert [ref=e31]
        - generic [ref=e32]: Correspondent Portal
    - generic [ref=e33]:
      - text: Powered by
      - link "LenderPrice Website" [ref=e34] [cursor=pointer]:
        - /url: https://lenderprice.com
        - text: LenderPrice
```
from flask import Flask, request, jsonify
from mydb import *
from flask_login import LoginManager, UserMixin, login_user, logout_user

app = Flask(__name__)
app.config['SECRET_KEY'] = '123456'

login_maneger = LoginManager(app)


class User(UserMixin):
    pass


def Admin_query(username, password):
    res = session.query(Admins).filter(Admins.username == username).filter(Admins.password == password).first()
    if res is not None:
        return res


@app.route('/api/login', methods=['POST'])
def login():
    username = request.form.get('name', None)
    passwprd = request.form.get('pass', None)
    if Admin_query(username, passwprd) is not None:
        curr_user = User()
        curr_user.id = username
        # // 生成登录后的session
        login_user(curr_user)
        return jsonify({'status': 'ok', 'info': '%s登录成功' % username, 'session': username})
    return jsonify({'status': 'no', 'info': '登录失败'})


# 加载当前用户
# @login_maneger.user_loader(
#
# )

if __name__ == "__main__":
    app.run(debug=True)

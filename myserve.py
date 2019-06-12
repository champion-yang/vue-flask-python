from flask import Flask,request,jsonify
from mydb import *

app = Flask(__name__)

def query_username(username):
    admin = session.query(Admins).filter(Admins.username==username).first()
    return admin

@app.route('/api/login',methods=['POST'])
def login():
    username = request.form.get('name',None)
    password = request.form.get('pass',None)
    print(username,password)
    # return 'ok'
    admin = query_username(username)
    if admin is not None:
        if admin.password == password:
            return jsonify({'status':'ok','info':'%s登录成功'%admin.username,'session':''})
        else:
            return jsonify({'status':'no','info':'密码错误'})
    else:
        return jsonify({'status':'no','info':'用户不存在'})

@app.route("/api/loginout",methods='POST')
def loginout():
    pass

if __name__ == "__main__":
    app.run(debug=True)
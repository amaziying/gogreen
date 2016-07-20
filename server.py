from flask import Flask, render_template
import pymssql

# Establish connection with Azure SQL database
conn = pymssql.connect(server="syde-361-server.database.windows.net", user="group-11@syde-361-server",
                       password="Apple@123", database="syde_361_metrics")
cursor = conn.cursor()

class CustomFlask(Flask):
    jinja_options = Flask.jinja_options.copy()
    jinja_options.update(dict(
        block_start_string='<%',
        block_end_string='%>',
        variable_start_string='%%',
        variable_end_string='%%',
        comment_start_string='<#',
        comment_end_string='#>',
    ))

def create_app():
    app = CustomFlask(__name__)

    return app

app = create_app()

@app.route('/')
def hello_world():
	return render_template("index.html")

@app.route('/api/data', methods=['GET'])
def get_newest_weight():
    sqlcmd = "SELECT TOP 2 Weight from garbage_weight_table ORDER BY Garbage_Time DESC"
    cursor.execute(sqlcmd)

    prev_weight = cursor.fetchall()[0]

    if not prev_weight:
        return 0

    return str(prev_weight[0])

if __name__ == '__main__':
	app.run(debug=True)

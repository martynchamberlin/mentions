<?

/* This file is a demo only. In the real world, you'd probably want to
 * do a regular database query. My example implementation is an OOP 
 * approach using PHP. Inside the arguments for the `PDO` object instantiation,
 * you'll need to fill out the placeholder values for your own database
 * credentials. You'll also want to change the `SELECT` statement so the
 * column names are named after your real columnn names. Note that I'm not 
 * organizing the return set using an `ORDER BY` clause. Twitter prioritizes
 * the return set by how often you've pinged other people already, which is
 * entering potentially complex logic best left up to your particular 
 * implementation. Good luck!
 */

// Uncomment the code block below to experience this plugin's full power

/*

if (isset( $_POST['handle'] ) )
{
	$pdo = new PDO('mysql:host=insertyourip;dbname=insertyourdbname', 'username', 'password');
	$sql = 'SELECT firstName, lastName, handle FROM users WHERE firstName LIKE :handle OR lastName LIKE :handle OR handle LIKE :handle LIMIT 5';
	$s = $pdo->prepare($sql);
	$s->bindValue('handle', "%" . $_POST['handle'] . "%");
	$s->execute();
	$return = $s->fetchAll();
	echo json_encode($return);
}

*/

$returnSet = <<<HEREDOC
[{"firstName":"Martyn","0":"Martyn","lastName":"Chamberlin","1":"Chamberlin","handle":"martynchamberlin","2":"martynchamberlin"},
{"firstName":"Mark","0":"Mark","lastName":"Makofsky","1":"Makofsky","handle":"markmakofsky","2":"markmakofsky"},
{"firstName":"Miller","0":"Miller","lastName":"Monroe","1":"Monroe","handle":"millermonroe","2":"millermonroe"}]
HEREDOC;

echo $returnSet;
?>

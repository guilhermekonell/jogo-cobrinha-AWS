import * as cdk from '@aws-cdk/core';
import * as ecr from '@aws-cdk/aws-ecr';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecsPatterns from '@aws-cdk/aws-ecs-patterns';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Repositório ECR
    const repository = new ecr.Repository(this, 'jogo-cobrinha', {
      repositoryName: 'jogo-cobrinha'
    });

    // Clusters e Recursos do ECS
    const cluster = new ecs.Cluster(this, 'app-cluster', {
      clusterName: 'app-cluster'
    });

    cluster.addCapacity('app-scaling-group', {
      instanceType: new ec2.InstanceType("t2.micro"),
      desiredCapacity: 1
    });

    const loadBalancedService = new ecsPatterns.ApplicationLoadBalancedEc2Service(this, 'app-service', {
      cluster,
      memoryLimitMiB: 512,
      cpu: 5,
      desiredCount: 1,
      serviceName: 'jogo-cobrinha',
      taskImageOptions: {
        image: ecs.ContainerImage.fromEcrRepository(repository),
        containerPort: 8080
      },
      publicLoadBalancer: true
    });
  } 
}

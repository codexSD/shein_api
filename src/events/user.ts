import { User } from '../models/user';
import { DomainEvent, DomainEventPublisher, DomainEventSubscriber, ForwardDomainEventPublisher } from './interfaces';

export class UserCreated implements DomainEvent {
  user: User;
  constructor(user: User) {
    this.user = user;
  }
}
export class WelcomeEmail implements DomainEventSubscriber {
  handle(event: DomainEvent): void {
    console.log('User Created: ' + (event as UserCreated).user);
  }
  canHandle(event: DomainEvent): boolean {
    return event instanceof UserCreated;
  }
}
